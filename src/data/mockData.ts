import type { Subject, Message } from '../types';

export const mockSubjects: Subject[] = [
    // --- WORK TOP LEVEL ---
    {
        id: 'f-work',
        title: 'Work',
        category: 'Folder',
        isPinned: false,
        isArchived: false,
        views: 0,
        lastUpdated: '2026-02-28T14:30:00Z',
    },
    // Work > Machine Learning
    {
        id: 'f-ml',
        title: 'Machine Learning',
        category: 'Folder',
        isPinned: false,
        isArchived: false,
        views: 0,
        lastUpdated: '2026-02-28T14:30:00Z',
        parentId: 'f-work',
    },
    { id: 's-ml-1', title: 'Neural Architecture Search', category: 'Deep Learning', isPinned: false, isArchived: false, views: 45, lastUpdated: '2026-02-28T10:00:00Z', parentId: 'f-ml' },
    { id: 's-ml-2', title: 'Transformer Optimization', category: 'NLP', isPinned: false, isArchived: false, views: 120, lastUpdated: '2026-02-27T15:00:00Z', parentId: 'f-ml' },
    { id: 's-ml-3', title: 'Federated Learning Security', category: 'Privacy', isPinned: false, isArchived: false, views: 32, lastUpdated: '2026-02-26T09:00:00Z', parentId: 'f-ml' },
    { id: 's-ml-4', title: 'Diffusion Models for Video', category: 'Generative AI', isPinned: false, isArchived: false, views: 210, lastUpdated: '2026-02-25T11:00:00Z', parentId: 'f-ml' },
    { id: 's-ml-5', title: 'Reinforcement Learning in Robotics', category: 'Robotics', isPinned: false, isArchived: false, views: 88, lastUpdated: '2026-02-24T14:00:00Z', parentId: 'f-ml' },

    // Work > Design
    {
        id: 'f-design',
        title: 'Design',
        category: 'Folder',
        isPinned: false,
        isArchived: false,
        views: 0,
        lastUpdated: '2026-02-28T14:30:00Z',
        parentId: 'f-work',
    },
    { id: 's-des-1', title: 'Design System Tokens', category: 'UI Infrastructure', isPinned: false, isArchived: false, views: 67, lastUpdated: '2026-02-28T08:00:00Z', parentId: 'f-design' },
    { id: 's-des-2', title: 'Glassmorphism Effects', category: 'Visual Style', isPinned: false, isArchived: false, views: 145, lastUpdated: '2026-02-27T12:00:00Z', parentId: 'f-design' },
    { id: 's-des-3', title: 'Accessibility Audit Q1', category: 'Compliance', isPinned: false, isArchived: false, views: 22, lastUpdated: '2026-02-26T16:00:00Z', parentId: 'f-design' },
    { id: 's-des-4', title: 'Typography Pairings', category: 'Branding', isPinned: false, isArchived: false, views: 93, lastUpdated: '2026-02-25T10:00:00Z', parentId: 'f-design' },
    { id: 's-des-5', title: 'Micro-interactions Flow', category: 'UX Design', isPinned: false, isArchived: false, views: 112, lastUpdated: '2026-02-24T09:00:00Z', parentId: 'f-design' },

    // --- PERSONAL TOP LEVEL ---
    {
        id: 'f-personal',
        title: 'Personal',
        category: 'Folder',
        isPinned: false,
        isArchived: false,
        views: 0,
        lastUpdated: '2026-02-28T14:30:00Z',
    },
    // --- TRAVEL (Under Personal) ---
    {
        id: 'f-travel',
        title: 'Travel',
        category: 'Folder',
        isPinned: false,
        isArchived: false,
        views: 0,
        lastUpdated: '2026-02-28T14:30:00Z',
        parentId: 'f-personal',
    },
    { id: 's-trav-1', title: 'Tokyo Itinerary', category: 'Japan', isPinned: true, isArchived: false, views: 302, lastUpdated: '2026-02-28T07:00:00Z', parentId: 'f-travel' },
    { id: 's-trav-2', title: 'Paris Hotel Options', category: 'France', isPinned: false, isArchived: false, views: 56, lastUpdated: '2026-02-27T18:00:00Z', parentId: 'f-travel' },
    { id: 's-trav-3', title: 'Swiss Pass Research', category: 'Switzerland', isPinned: false, isArchived: false, views: 44, lastUpdated: '2026-02-26T11:00:00Z', parentId: 'f-travel' },
    { id: 's-trav-4', title: 'Packing List Essentials', category: 'Gear', isPinned: false, isArchived: false, views: 128, lastUpdated: '2026-02-25T08:00:00Z', parentId: 'f-travel' },
    { id: 's-trav-5', title: 'Flight Credit Tracking', category: 'Logistics', isPinned: false, isArchived: false, views: 15, lastUpdated: '2026-02-24T16:00:00Z', parentId: 'f-travel' },

    // --- HEALTH (Under Personal) ---
    {
        id: 'f-health',
        title: 'Health',
        category: 'Folder',
        isPinned: false,
        isArchived: false,
        views: 0,
        lastUpdated: '2026-02-28T14:30:00Z',
        parentId: 'f-personal',
    },
    { id: 's-health-1', title: 'Macros Tracking', category: 'Nutrition', isPinned: false, isArchived: false, views: 442, lastUpdated: '2026-02-28T09:00:00Z', parentId: 'f-health' },
    { id: 's-health-2', title: 'Sleep Cycle Analysis', category: 'Wellness', isPinned: false, isArchived: false, views: 231, lastUpdated: '2026-02-27T22:00:00Z', parentId: 'f-health' },
    { id: 's-health-3', title: 'Kettlebell Routine', category: 'Fitness', isPinned: false, isArchived: false, views: 89, lastUpdated: '2026-02-26T07:00:00Z', parentId: 'f-health' },
    { id: 's-health-4', title: 'Supplements Stack', category: 'Biohacking', isPinned: false, isArchived: false, views: 167, lastUpdated: '2026-02-25T20:00:00Z', parentId: 'f-health' },
    { id: 's-health-5', title: 'Meditation Streaks', category: 'Mental Health', isPinned: false, isArchived: false, views: 54, lastUpdated: '2026-02-24T21:00:00Z', parentId: 'f-health' },
];

export const mockMessages: Message[] = [
    // --- WORK > ML > Neural Architecture Search (s-ml-1) ---
    { id: 'm-ml-1-1', subjectId: 's-ml-1', role: 'user', content: 'What is the most efficient way to search for a neural architecture for a mobile device?', timestamp: '2026-02-28T10:00:00Z' },
    { id: 'm-ml-1-2', subjectId: 's-ml-1', role: 'ai', content: 'For mobile devices, hardware-aware NAS is key. You need to incorporate latency as a constraint in your search objective.', timestamp: '2026-02-28T10:01:00Z' },
    { id: 'm-ml-1-3', subjectId: 's-ml-1', role: 'user', content: 'How do you measure latency during search? It seems expensive.', timestamp: '2026-02-28T10:05:00Z' },
    { id: 'm-ml-1-4', subjectId: 's-ml-1', role: 'ai', content: 'Instead of direct measurement, common techniques use latency lookup tables or a latency predictor (a small neural net) trained on targeted hardware.', timestamp: '2026-02-28T10:06:00Z' },
    { id: 'm-ml-1-5', subjectId: 's-ml-1', role: 'user', content: 'What about differentiable NAS (DARTS)?', timestamp: '2026-02-28T10:10:00Z' },
    { id: 'm-ml-1-6', subjectId: 's-ml-1', role: 'ai', content: 'DARTS is fast but has memory issues. ProxylessNAS improved this by binarizing the architecture parameters, which is much better for mobile-scale searches.', timestamp: '2026-02-28T10:12:00Z' },
    { id: 'm-ml-1-7', subjectId: 's-ml-1', role: 'user', content: 'Can we search for activation functions too?', timestamp: '2026-02-28T10:15:00Z' },
    { id: 'm-ml-1-8', subjectId: 's-ml-1', role: 'ai', content: 'Yes, searching for activations like Swish or Mish has shown gains. However, ensure the hardware supports them efficiently, as some custom activations can be slow on certain NPUs.', timestamp: '2026-02-28T10:16:00Z' },

    // --- WORK > ML > Transformer Optimization (s-ml-2) ---
    { id: 'm-ml-2-1', subjectId: 's-ml-2', role: 'user', content: 'How can we reduce the memory footprint of our transformer models?', timestamp: '2026-02-27T15:00:00Z' },
    { id: 'm-ml-2-2', subjectId: 's-ml-2', role: 'ai', content: 'Quantization is the first step. 4-bit (NF4) quantization via bitsandbytes is very effective for large LLMs.', timestamp: '2026-02-27T15:01:00Z' },
    { id: 'm-ml-2-3', subjectId: 's-ml-2', role: 'user', content: 'Does quantization hurt accuracy significantly?', timestamp: '2026-02-27T15:05:00Z' },
    { id: 'm-ml-2-4', subjectId: 's-ml-2', role: 'ai', content: 'With QLoRA, the impact is minimized. You only train the low-rank adapters in higher precision while keeping the base weights at 4-bit.', timestamp: '2026-02-27T15:06:00Z' },
    { id: 'm-ml-2-5', subjectId: 's-ml-2', role: 'user', content: 'What about Flash Attention?', timestamp: '2026-02-27T15:10:00Z' },
    {
        id: 'm-ml-2-6',
        subjectId: 's-ml-2',
        role: 'ai',
        content: 'Flash Attention 2 is essential. It avoids the O(n²) memory bottleneck by tiling the attention computation. It\'s a huge speedup for long context.',
        timestamp: '2026-02-27T15:12:00Z',
        threads: [
            {
                id: 't-ml-2-6-1',
                lastUpdated: '2026-02-27T15:15:00Z',
                summary: 'Attention calculation',
                messages: [
                    {
                        id: 'm-ml-2-6-t1',
                        subjectId: 's-ml-2',
                        role: 'user',
                        content: 'What is attention computation?',
                        timestamp: '2026-02-27T15:14:00Z',
                    },
                    {
                        id: 'm-ml-2-6-t2',
                        subjectId: 's-ml-2',
                        role: 'ai',
                        content: 'Attention calculation computes a weighted sum of values based on query-key similarities, allowing the model to focus on relevant parts of the input.',
                        timestamp: '2026-02-27T15:15:00Z',
                    },
                ]
            },
            {
                id: 't-ml-2-6-2',
                lastUpdated: '2026-02-27T15:20:00Z',
                summary: 'PyTorch Flash Attention 2',
                messages: [
                    {
                        id: 'm-ml-2-6-t3',
                        subjectId: 's-ml-2',
                        role: 'user',
                        content: 'Is Flash Attention 2 available for PyTorch?',
                        timestamp: '2026-02-27T15:18:00Z',
                    },
                    {
                        id: 'm-ml-2-6-t4',
                        subjectId: 's-ml-2',
                        role: 'ai',
                        content: 'Yes, it is integrated in PyTorch 2.0+ via the scaled_dot_product_attention function and also available as a standalone package.',
                        timestamp: '2026-02-27T15:20:00Z',
                    },
                ]
            }
        ],
    },
    { id: 'm-ml-2-7', subjectId: 's-ml-2', role: 'user', content: 'And KV cache optimization?', timestamp: '2026-02-27T15:15:00Z' },
    { id: 'm-ml-2-8', subjectId: 's-ml-2', role: 'ai', content: 'PagedAttention (as used in vLLM) solves memory fragmentation in the KV cache, allowing for much higher serving throughput.', timestamp: '2026-02-27T15:17:00Z' },

    // --- WORK > Design > Design System Tokens (s-des-1) ---
    { id: 'm-des-1-1', subjectId: 's-des-1', role: 'user', content: 'How should we structure our color tokens?', timestamp: '2026-02-28T08:00:00Z' },
    { id: 'm-des-1-2', subjectId: 's-des-1', role: 'ai', content: 'I recommend a tiered system: Global (Primitives), Semantic (Intent), and Component-specific.', timestamp: '2026-02-28T08:01:00Z' },
    { id: 'm-des-1-3', subjectId: 's-des-1', role: 'user', content: 'Why the semantic layer? Why not just use primitives directly?', timestamp: '2026-02-28T08:05:00Z' },
    { id: 'm-des-1-4', subjectId: 's-des-1', role: 'ai', content: 'Semantic tokens (e.g., --bg-surface) allow you to swap values for themes like Dark Mode without changing the component code.', timestamp: '2026-02-28T08:06:00Z' },
    { id: 'm-des-1-5', subjectId: 's-des-1', role: 'user', content: 'What naming convention should we use?', timestamp: '2026-02-28T08:10:00Z' },
    { id: 'm-des-1-6', subjectId: 's-des-1', role: 'ai', content: 'Pattern-based names like {Category}-{Type}-{Item}-{State} work well. For example: color-bg-button-primary-hover.', timestamp: '2026-02-28T08:12:00Z' },
    { id: 'm-des-1-7', subjectId: 's-des-1', role: 'user', content: 'Do we need a "Utility" tier?', timestamp: '2026-02-28T08:15:00Z' },
    { id: 'm-des-1-8', subjectId: 's-des-1', role: 'ai', content: 'Utility tokens for spacing and shadows are useful, but keep them strictly linked to the semantic grid to avoid "spacing sprawl".', timestamp: '2026-02-28T08:17:00Z' },

    // --- TRAVEL > Tokyo Itinerary (s-trav-1) ---
    { id: 'm-trav-1-1', subjectId: 's-trav-1', role: 'user', content: 'Best neighborhood to stay in Tokyo for foodies?', timestamp: '2026-02-28T07:00:00Z' },
    { id: 'm-trav-1-2', subjectId: 's-trav-1', role: 'ai', content: 'Ebisu or Shibuya. Ebisu has a higher concentration of izakayas and high-end sushi without the extreme crowds of Shinjuku.', timestamp: '2026-02-28T07:01:00Z' },
    { id: 'm-trav-1-3', subjectId: 's-trav-1', role: 'user', content: 'Should I visit Tsukiji Outer Market late in the morning?', timestamp: '2026-02-28T07:10:00Z' },
    { id: 'm-trav-1-4', subjectId: 's-trav-1', role: 'ai', content: 'No, aim for 8-9 AM. Many stalls start closing by 1 PM, and the popular breakfast spots will have 2-hour waits by then.', timestamp: '2026-02-28T07:12:00Z' },
    { id: 'm-trav-1-5', subjectId: 's-trav-1', role: 'user', content: 'What\'s a good day trip from Tokyo?', timestamp: '2026-02-28T07:20:00Z' },
    { id: 'm-trav-1-6', subjectId: 's-trav-1', role: 'ai', content: 'Kamakura for temples and the beach, or Hakone if you want a view of Mt. Fuji from an onsen.', timestamp: '2026-02-28T07:22:00Z' },
    { id: 'm-trav-1-7', subjectId: 's-trav-1', role: 'user', content: 'How easy is it to get around with just English?', timestamp: '2026-02-28T07:30:00Z' },
    { id: 'm-trav-1-8', subjectId: 's-trav-1', role: 'ai', content: 'Very easy in Tokyo. All train stations have English signage and many restaurant menus have pictures or QRs with English translations.', timestamp: '2026-02-28T07:32:00Z' },

    // --- HEALTH > Macros Tracking (s-health-1) ---
    { id: 'm-health-1-1', subjectId: 's-health-1', role: 'user', content: 'Am I hitting my protein goal?', timestamp: '2026-02-28T09:00:00Z' },
    { id: 'm-health-1-2', subjectId: 's-health-1', role: 'ai', content: 'Based on your logs, you\'ve reached 110g. You are 40g short of your 150g target for today.', timestamp: '2026-02-28T09:01:00Z' },
    { id: 'm-health-1-3', subjectId: 's-health-1', role: 'user', content: 'What should I eat for dinner to fill that gap?', timestamp: '2026-02-28T09:10:00Z' },
    { id: 'm-health-1-4', subjectId: 's-health-1', role: 'ai', content: 'A 200g chicken breast or a large portion of Greek yogurt with hemp seeds would get you there.', timestamp: '2026-02-28T09:12:00Z' },
    { id: 'm-health-1-5', subjectId: 's-health-1', role: 'user', content: 'Does collagen protein count toward my muscle-building goal?', timestamp: '2026-02-28T09:20:00Z' },
    { id: 'm-health-1-6', subjectId: 's-health-1', role: 'ai', content: 'Collagen lacks Tryptophan and is low in Leucine. It\'s great for joints, but use whey or soy for muscle synthesis.', timestamp: '2026-02-28T09:22:00Z' },
    { id: 'm-health-1-7', subjectId: 's-health-1', role: 'user', content: 'I feel bloated after high-protein days.', timestamp: '2026-02-28T09:30:00Z' },
    { id: 'm-health-1-8', subjectId: 's-health-1', role: 'ai', content: 'Ensure you\'re increasing fiber intake and water alongside the protein. Digestive enzymes with protease can also help.', timestamp: '2026-02-28T09:32:00Z' },

    // ... Note: I'm adding enough turns for several more subjects to satisfy the requirement
    // --- WORK > ML > Federated Learning (s-ml-3) ---
    { id: 'm-ml-3-1', subjectId: 's-ml-3', role: 'user', content: 'Is federated learning safe from model inversion?', timestamp: '2026-02-26T09:00:00Z' },
    { id: 'm-ml-3-2', subjectId: 's-ml-3', role: 'ai', content: 'Not by default. While raw data stays on devices, gradients can be reverse-engineered to reconstruct partial inputs.', timestamp: '2026-02-26T09:02:00Z' },
    { id: 'm-ml-3-3', subjectId: 's-ml-3', role: 'user', content: 'How do we fix that?', timestamp: '2026-02-26T09:05:00Z' },
    { id: 'm-ml-3-4', subjectId: 's-ml-3', role: 'ai', content: 'Differential Privacy (DP) is the solution. Adding noise to gradients before aggregation masks individual contribution.', timestamp: '2026-02-26T09:07:00Z' },
    { id: 'm-ml-3-5', subjectId: 's-ml-3', role: 'user', content: 'But noise hurts accuracy.', timestamp: '2026-02-26T09:10:00Z' },
    { id: 'm-ml-3-6', subjectId: 's-ml-3', role: 'ai', content: 'Correct. It\'s a tradeoff. You need to tune your "epsilon" value to find the balance between privacy and utility.', timestamp: '2026-02-26T09:12:00Z' },
    { id: 'm-ml-3-7', subjectId: 's-ml-3', role: 'user', content: 'What about Secure Multi-Party Computation (SMPC)?', timestamp: '2026-02-26T09:15:00Z' },
    { id: 'm-ml-3-8', subjectId: 's-ml-3', role: 'ai', content: 'SMPC is great for cryptographically secure aggregation, but it has much higher communication overhead than DP.', timestamp: '2026-02-26T09:17:00Z' },

    // --- WORK > Design > Glassmorphism (s-des-2) ---
    { id: 'm-des-2-1', subjectId: 's-des-2', role: 'user', content: 'Can we use backdrop-filter for a premium feel?', timestamp: '2026-02-27T12:00:00Z' },
    { id: 'm-des-2-2', subjectId: 's-des-2', role: 'ai', content: 'Yes! It\'s the hallmark of the Modern Glass look. Use blur(15px) for the background.', timestamp: '2026-02-27T12:01:00Z' },
    { id: 'm-des-2-3', subjectId: 's-des-2', role: 'user', content: 'What about the border?', timestamp: '2026-02-27T12:05:00Z' },
    { id: 'm-des-2-4', subjectId: 's-des-2', role: 'ai', content: 'A thin 1px white border at 10-20% opacity. This defines the edge against the blurred content effectively.', timestamp: '2026-02-27T12:06:00Z' },
    { id: 'm-des-2-5', subjectId: 's-des-2', role: 'user', content: 'Should I add a drop shadow?', timestamp: '2026-02-27T12:10:00Z' },
    { id: 'm-des-2-6', subjectId: 's-des-2', role: 'ai', content: 'Avoid heavy black shadows. Use a subtle, large-radius colored shadow that matches the background hue for more depth.', timestamp: '2026-02-27T12:12:00Z' },
    { id: 'm-des-2-7', subjectId: 's-des-2', role: 'user', content: 'Does this work on mobile?', timestamp: '2026-02-27T12:15:00Z' },
    { id: 'm-des-2-8', subjectId: 's-des-2', role: 'ai', content: 'Most modern mobile browsers support it, but it\'s GPU-intensive. Use it sparingly on scrollable lists.', timestamp: '2026-02-27T12:17:00Z' },

    // --- HEALTH > Sleep Analysis (s-health-2) ---
    { id: 'm-health-2-1', subjectId: 's-health-2', role: 'user', content: 'Why was my REM sleep low last night?', timestamp: '2026-02-27T22:00:00Z' },
    { id: 'm-health-2-2', subjectId: 's-health-2', role: 'ai', content: 'Alcohol or late-night caffeine are the most common culprits for suppressing REM cycles.', timestamp: '2026-02-27T22:01:00Z' },
    { id: 'm-health-2-3', subjectId: 's-health-2', role: 'user', content: 'I had a glass of wine at 8 PM. Could that be it?', timestamp: '2026-02-27T22:15:00Z' },
    { id: 'm-health-2-4', subjectId: 's-health-2', role: 'ai', content: 'Highly likely. Alcohol is a sedative that increases deep sleep but fragments the second half of the night.', timestamp: '2026-02-27T22:17:00Z' },
    { id: 'm-health-2-5', subjectId: 's-health-2', role: 'user', content: 'Should I take Melatonin?', timestamp: '2026-02-27T22:30:00Z' },
    { id: 'm-health-2-6', subjectId: 's-health-2', role: 'ai', content: 'Melatonin is best for jet lag. For general quality, Magnesium Bisglycinate is less habit-forming.', timestamp: '2026-02-27T22:32:00Z' },
    { id: 'm-health-2-7', subjectId: 's-health-2', role: 'user', content: 'What about blue light filters?', timestamp: '2026-02-27T22:45:00Z' },
    { id: 'm-health-2-8', subjectId: 's-health-2', role: 'ai', content: 'They help, but absolute darkness and a 65°F (18°C) room temperature are more powerful sleep signals.', timestamp: '2026-02-27T22:47:00Z' },

    // ... Adding some simpler 4-turn dialogues for the remaining subjects to ensure breadth and depth
    { id: 'm-ml-4-1', subjectId: 's-ml-4', role: 'user', content: 'Video diffusion models?', timestamp: '2026-02-25T11:00:00Z' },
    { id: 'm-ml-4-2', subjectId: 's-ml-4', role: 'ai', content: 'Sora and Stable Video Diffusion are leading. They use 3D convolutions or spatio-temporal attention.', timestamp: '2026-02-25T11:01:00Z' },
    { id: 'm-ml-4-3', subjectId: 's-ml-4', role: 'user', content: 'How do they handle consistency?', timestamp: '2026-02-25T11:05:00Z' },
    { id: 'm-ml-4-4', subjectId: 's-ml-4', role: 'ai', content: 'By processing temporal blocks and using flow-based structural guidance.', timestamp: '2026-02-25T11:06:00Z' },

    { id: 'm-trav-2-1', subjectId: 's-trav-2', role: 'user', content: 'Paris hotels near Marais?', timestamp: '2026-02-27T18:00:00Z' },
    { id: 'm-trav-2-2', subjectId: 's-trav-2', role: 'ai', content: 'Pavillon de la Reine is beautiful. Hôtel de Joise est also great for value.', timestamp: '2026-02-27T18:01:00Z' },
    { id: 'm-trav-2-3', subjectId: 's-trav-2', role: 'user', content: 'Is breakfast included?', timestamp: '2026-02-27T18:10:00Z' },
    { id: 'm-trav-2-4', subjectId: 's-trav-2', role: 'ai', content: 'Usually for Pavillon, not for Joise. Check booking terms.', timestamp: '2026-02-27T18:12:00Z' },

    { id: 'm-health-3-1', subjectId: 's-health-3', role: 'user', content: 'Next step after 16kg swings?', timestamp: '2026-02-26T07:00:00Z' },
    { id: 'm-health-3-2', subjectId: 's-health-3', role: 'ai', content: 'Move to one-handed swings or step up to 20kg once you can do 10x10 in 5 mins.', timestamp: '2026-02-26T07:01:00Z' },
    { id: 'm-health-3-3', subjectId: 's-health-3', role: 'user', content: 'One-handed feels unstable.', timestamp: '2026-02-26T07:10:00Z' },
    { id: 'm-health-3-4', subjectId: 's-health-3', role: 'ai', content: 'That\'s the core challenge! Engage your lats more to stabilize.', timestamp: '2026-02-26T07:12:00Z' },

    // Additional turns for other subjects...
    { id: 'm-ml-5-1', subjectId: 's-ml-5', role: 'user', content: 'PPO for robotics?', timestamp: '2026-02-24T14:00:00Z' },
    { id: 'm-ml-5-2', subjectId: 's-ml-5', role: 'ai', content: 'Robust but sample-hungry. SAC is usually better for contact-heavy tasks.', timestamp: '2026-02-24T14:01:00Z' },
    { id: 'm-ml-5-3', subjectId: 's-ml-5', role: 'user', content: 'What about sim-to-real?', timestamp: '2026-02-24T14:10:00Z' },
    { id: 'm-ml-5-4', subjectId: 's-ml-5', role: 'ai', content: 'Domain Randomization is the standard fix for the simulation gap.', timestamp: '2026-02-24T14:12:00Z' },

    { id: 'm-des-3-1', subjectId: 's-des-3', role: 'user', content: 'Accessibility audit?', timestamp: '2026-02-26T16:00:00Z' },
    { id: 'm-des-3-2', subjectId: 's-des-3', role: 'ai', content: 'Sidebar text contrast is low. It\'s 3.2:1, needs to be 4.5:1 for WCAG AA.', timestamp: '2026-02-26T16:01:00Z' },
    { id: 'm-des-3-3', subjectId: 's-des-3', role: 'user', content: 'Can we use a lighter background instead?', timestamp: '2026-02-26T16:10:00Z' },
    { id: 'm-des-3-4', subjectId: 's-des-3', role: 'ai', content: 'Yes, or darken the text. Darkening text is safer for readability.', timestamp: '2026-02-26T16:12:00Z' },

    { id: 'm-des-4-1', subjectId: 's-des-4', role: 'user', content: 'Typography for Inter?', timestamp: '2026-02-25T10:00:00Z' },
    { id: 'm-des-4-2', subjectId: 's-des-4', role: 'ai', content: 'Inter is versatile. Combine with a serif like Playfair for elegance.', timestamp: '2026-02-25T10:01:00Z' },
    { id: 'm-des-4-3', subjectId: 's-des-4', role: 'user', content: 'What about weight?', timestamp: '2026-02-25T10:10:00Z' },
    { id: 'm-des-4-4', subjectId: 's-des-4', role: 'ai', content: 'Semi-bold (600) for subheads, Regular (400) for body.', timestamp: '2026-02-25T10:12:00Z' },

    { id: 'm-des-5-1', subjectId: 's-des-5', role: 'user', content: 'Micro-interactions?', timestamp: '2026-02-24T09:00:00Z' },
    { id: 'm-des-5-2', subjectId: 's-des-5', role: 'ai', content: 'Use spring physics for a more natural, fluid feel for hover and click states.', timestamp: '2026-02-24T09:01:00Z' },
    { id: 'm-des-5-3', subjectId: 's-des-5', role: 'user', content: 'Spring variables?', timestamp: '2026-02-24T09:10:00Z' },
    { id: 'm-des-5-4', subjectId: 's-des-5', role: 'ai', content: 'Stiffness: 400, Damping: 30 is a good starting point for UI buttons.', timestamp: '2026-02-24T09:12:00Z' },

    { id: 'm-trav-3-1', subjectId: 's-trav-3', role: 'user', content: 'Swiss Pass?', timestamp: '2026-02-26T11:00:00Z' },
    { id: 'm-trav-3-2', subjectId: 's-trav-3', role: 'ai', content: 'Covers all trains, buses, and boats. Also gives 50% off mountain lifts.', timestamp: '2026-02-26T11:01:00Z' },
    { id: 'm-trav-3-3', subjectId: 's-trav-3', role: 'user', content: 'Jungfraujoch too?', timestamp: '2026-02-26T11:10:00Z' },
    { id: 'm-trav-3-4', subjectId: 's-trav-3', role: 'ai', content: 'It gives a 25% discount for that specific peak, which is higher than most others.', timestamp: '2026-02-26T11:12:00Z' },

    { id: 'm-trav-4-1', subjectId: 's-trav-4', role: 'user', content: 'Packing list?', timestamp: '2026-02-25T08:00:00Z' },
    { id: 'm-trav-4-2', subjectId: 's-trav-4', role: 'ai', content: 'Light layers, comfortable walking shoes (10 miles/day), and a 10,000mAh battery pack.', timestamp: '2026-02-25T08:01:00Z' },
    { id: 'm-trav-4-3', subjectId: 's-trav-4', role: 'user', content: 'Umbrella?', timestamp: '2026-02-25T08:10:00Z' },
    { id: 'm-trav-4-4', subjectId: 's-trav-4', role: 'ai', content: 'Buy a reliable one at a 7-Eleven in Tokyo. They\'re cheap and sturdy.', timestamp: '2026-02-25T08:12:00Z' },

    { id: 'm-trav-5-1', subjectId: 's-trav-5', role: 'user', content: 'Flight credits?', timestamp: '2026-02-24T16:00:00Z' },
    { id: 'm-trav-5-2', subjectId: 's-trav-5', role: 'ai', content: 'You have $240 expiring Dec 31. Need to book a trip soon!', timestamp: '2026-02-24T16:01:00Z' },
    { id: 'm-trav-5-3', subjectId: 's-trav-5', role: 'user', content: 'Any restrictions?', timestamp: '2026-02-24T16:10:00Z' },
    { id: 'm-trav-5-4', subjectId: 's-trav-5', role: 'ai', content: 'Must be a Delta-marketed flight. Cannot be used for companion certificates.', timestamp: '2026-02-24T16:12:00Z' },

    { id: 'm-health-4-1', subjectId: 's-health-4', role: 'user', content: 'Supplements?', timestamp: '2026-02-25T20:00:00Z' },
    { id: 'm-health-4-2', subjectId: 's-health-4', role: 'ai', content: 'Magnesium, Vitamin D3+K2, and Creatine are your current daily foundations.', timestamp: '2026-02-25T20:01:00Z' },
    { id: 'm-health-4-3', subjectId: 's-health-4', role: 'user', content: 'Omega 3?', timestamp: '2026-02-25T20:10:00Z' },
    { id: 'm-health-4-4', subjectId: 's-health-4', role: 'ai', content: 'Only if you\'re not eating fish 3x/week. Aim for 2g of EPA/DHA combined.', timestamp: '2026-02-25T20:12:00Z' },

    { id: 'm-health-5-1', subjectId: 's-health-5', role: 'user', content: 'Meditation?', timestamp: '2026-02-24T21:00:00Z' },
    { id: 'm-health-5-2', subjectId: 's-health-5', role: 'ai', content: 'You missed today. Your 4-day streak just reset. Start again tomorrow!', timestamp: '2026-02-24T21:01:00Z' },
    { id: 'm-health-5-3', subjectId: 's-health-5', role: 'user', content: '10 mins felt hard today.', timestamp: '2026-02-24T21:10:00Z' },
    { id: 'm-health-5-4', subjectId: 's-health-5', role: 'ai', content: 'Just do 1 minute. The goal is showing up, not the duration.', timestamp: '2026-02-24T21:12:00Z' },
];
