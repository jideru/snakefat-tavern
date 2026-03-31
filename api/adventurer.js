import { Redis } from '@upstash/redis';
import crypto from 'crypto';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

/**
 * Hash the public ID (e.g. "DJ001") with a secret salt so the real ID
 * is never stored in plain text. The hash is what sits in the database;
 * validation re-hashes the user's input and compares.
 */
function hashShopId(publicId) {
  return crypto
    .createHash('sha256')
    .update(publicId + process.env.SHOP_ID_SALT)
    .digest('hex');
}

function key(name) {
  return `adventurer:${name.toLowerCase().replace(/\s+/g, '_')}`;
}

export default async function handler(req, res) {
  // Only allow these methods
  if (!['GET', 'POST', 'PUT'].includes(req.method)) {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // ── POST /api/adventurer ──────────────────────────────────────────────────
  // Create a new adventurer. Called by you (admin) when setting up a user.
  // Body: { name, cash, publicShopId }
  if (req.method === 'POST') {
    const { name, cash, publicShopId } = req.body ?? {};

    if (!name || cash == null || !publicShopId) {
      return res.status(400).json({ error: 'name, cash and publicShopId are required' });
    }

    const k = key(name);
    const exists = await redis.exists(k);
    if (exists) {
      return res.status(409).json({ error: 'Adventurer already exists' });
    }

    await redis.hset(k, {
      name,
      cash: Number(cash),
      hashedShopId: hashShopId(publicShopId), // only the hash is stored
      boughtItems: '',
    });

    return res.status(201).json({ message: 'Adventurer created', name });
  }

  // ── GET /api/adventurer?name=Den+Jeff&shopId=DJ001 ────────────────────────
  // Retrieve an adventurer after validating their public shop ID.
  if (req.method === 'GET') {
    const { name, shopId } = req.query ?? {};

    if (!name || !shopId) {
      return res.status(400).json({ error: 'name and shopId query params are required' });
    }

    const adventurer = await redis.hgetall(key(name));
    if (!adventurer) {
      return res.status(404).json({ error: 'Adventurer not found' });
    }

    if (adventurer.hashedShopId !== hashShopId(shopId)) {
      return res.status(401).json({ error: 'Invalid shop ID' });
    }

    // Never return the hash to the client
    const { hashedShopId: _, ...safe } = adventurer;
    return res.status(200).json(safe);
  }

  // ── PUT /api/adventurer ───────────────────────────────────────────────────
  // Update cash and/or boughtItems. Requires name + shopId for auth.
  // Body: { name, shopId, cash?, boughtItems? }
  if (req.method === 'PUT') {
    const { name, shopId, cash, boughtItems } = req.body ?? {};

    if (!name || !shopId) {
      return res.status(400).json({ error: 'name and shopId are required' });
    }

    const adventurer = await redis.hgetall(key(name));
    if (!adventurer) {
      return res.status(404).json({ error: 'Adventurer not found' });
    }

    if (adventurer.hashedShopId !== hashShopId(shopId)) {
      return res.status(401).json({ error: 'Invalid shop ID' });
    }

    const updates = {};
    if (cash != null)       updates.cash = Number(cash);
    if (boughtItems != null) updates.boughtItems = String(boughtItems);

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: 'Nothing to update' });
    }

    await redis.hset(key(name), updates);
    return res.status(200).json({ message: 'Updated', ...updates });
  }
}
