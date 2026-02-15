export interface DAOTopic {
  id: string;
  title: string;
  category: string;
  tags: string[];
  status: 'draft' | 'discussion' | 'voting' | 'passed' | 'rejected';
  author: string;
  createdAt: string;
  votes: number;
  comments: number;
  preview: string;
  content: string;
}

export const daoCategories = [
  'Treasury',
  'Technical',
  'Marketing',
  'Community',
  'Governance',
];

export const daoTopics: DAOTopic[] = [
  {
    id: 'topic-1',
    title: 'Treasury Allocation Q1 2026',
    category: 'Treasury',
    tags: ['budget', 'allocation', 'Q1'],
    status: 'voting',
    author: 'Community Member',
    createdAt: '2026-02-10',
    votes: 1250,
    comments: 45,
    preview: 'Proposal to allocate 100M QMY from treasury for Q1 2026 operations including development, marketing, and community initiatives.',
    content: `# Treasury Allocation Q1 2026

## Summary
This proposal outlines the allocation of 100M QMY from the treasury for Q1 2026 operations.

## Breakdown
- Development: 40M QMY (40%)
- Marketing: 30M QMY (30%)
- Community Initiatives: 20M QMY (20%)
- Operations: 10M QMY (10%)

## Rationale
These allocations will support continued platform development, expand our user base through targeted marketing, and strengthen community engagement.

## Timeline
Implementation: March 1, 2026
Review: April 30, 2026

**Note:** This is a simulated proposal for demonstration purposes only.`,
  },
  {
    id: 'topic-2',
    title: 'Protocol Upgrade v2.0',
    category: 'Technical',
    tags: ['upgrade', 'protocol', 'technical'],
    status: 'discussion',
    author: 'Tech Team',
    createdAt: '2026-02-12',
    votes: 3420,
    comments: 89,
    preview: 'Major protocol upgrade introducing enhanced security features, improved transaction speeds, and new governance mechanisms.',
    content: `# Protocol Upgrade v2.0

## Overview
This proposal introduces Protocol v2.0 with significant improvements to security, performance, and governance.

## Key Features
1. **Enhanced Security**: Multi-signature wallet support and improved encryption
2. **Performance**: 3x faster transaction processing
3. **Governance**: New voting mechanisms with quadratic voting

## Technical Details
- Canister upgrade required
- Backward compatible with v1.x
- Migration period: 30 days

## Testing
Extensive testing completed on testnet with 10,000+ transactions processed successfully.

**Note:** This is a simulated proposal for demonstration purposes only.`,
  },
  {
    id: 'topic-3',
    title: 'Marketing Campaign - Global Expansion',
    category: 'Marketing',
    tags: ['marketing', 'expansion', 'global'],
    status: 'passed',
    author: 'Marketing Lead',
    createdAt: '2026-02-05',
    votes: 2100,
    comments: 67,
    preview: 'Comprehensive marketing campaign targeting key markets in Asia, Europe, and Latin America with localized content and partnerships.',
    content: `# Marketing Campaign - Global Expansion

## Objective
Expand Quantumoney presence in key international markets through targeted campaigns and strategic partnerships.

## Target Markets
- Asia: Focus on Japan, South Korea, Singapore
- Europe: Germany, France, UK
- Latin America: Brazil, Mexico, Argentina

## Budget
Total: 30M QMY over 6 months

## Expected Outcomes
- 500K new users
- 50+ strategic partnerships
- 10x increase in brand awareness

**Status:** Approved and in execution phase.

**Note:** This is a simulated proposal for demonstration purposes only.`,
  },
  {
    id: 'topic-4',
    title: 'Community Rewards Program',
    category: 'Community',
    tags: ['rewards', 'community', 'incentives'],
    status: 'discussion',
    author: 'Community Manager',
    createdAt: '2026-02-13',
    votes: 890,
    comments: 34,
    preview: 'New rewards program to incentivize active community participation, content creation, and platform advocacy.',
    content: `# Community Rewards Program

## Purpose
Reward active community members who contribute to platform growth through content creation, moderation, and advocacy.

## Reward Tiers
- Bronze: 100 QMY/month (Active participation)
- Silver: 500 QMY/month (Content creators)
- Gold: 2000 QMY/month (Community leaders)

## Eligibility
- Minimum 3 months membership
- Positive community standing
- Regular contributions

## Implementation
Rolling out in phases starting March 2026.

**Note:** This is a simulated proposal for demonstration purposes only.`,
  },
  {
    id: 'topic-5',
    title: 'Governance Framework Update',
    category: 'Governance',
    tags: ['governance', 'framework', 'voting'],
    status: 'draft',
    author: 'DAO Council',
    createdAt: '2026-02-14',
    votes: 450,
    comments: 12,
    preview: 'Proposed updates to governance framework including new voting thresholds, proposal requirements, and decision-making processes.',
    content: `# Governance Framework Update

## Proposed Changes
1. **Voting Thresholds**: Increase quorum from 10% to 15%
2. **Proposal Requirements**: Minimum 1000 QMY stake to submit proposals
3. **Voting Period**: Extend from 7 to 14 days

## Rationale
These changes will ensure more thoughtful decision-making and broader community participation.

## Discussion Period
Open for community feedback until February 28, 2026.

**Note:** This is a simulated proposal for demonstration purposes only.`,
  },
];

export function getTopicById(id: string): DAOTopic | undefined {
  return daoTopics.find(topic => topic.id === id);
}

export function getTopicsByCategory(category: string): DAOTopic[] {
  return daoTopics.filter(topic => topic.category === category);
}

export function getTopicsByStatus(status: DAOTopic['status']): DAOTopic[] {
  return daoTopics.filter(topic => topic.status === status);
}
