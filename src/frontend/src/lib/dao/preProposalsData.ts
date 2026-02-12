export interface PreProposal {
  id: string;
  title: string;
  description: string;
  category: string;
  objective: string;
  impact: string;
  fullDetails: Array<{
    heading: string;
    content: string;
  }>;
}

const preProposals: PreProposal[] = [
  {
    id: 'prop-001',
    title: 'Community Treasury Allocation Framework',
    description: 'Establish guidelines for allocating community treasury funds to support ecosystem growth and development initiatives.',
    category: 'Treasury',
    objective: 'Create a transparent and fair framework for distributing treasury resources to community-driven projects.',
    impact: 'Enables sustainable ecosystem growth while maintaining community oversight and accountability.',
    fullDetails: [
      {
        heading: 'Background',
        content: 'The community treasury requires clear allocation guidelines to ensure funds are used effectively for ecosystem development.',
      },
      {
        heading: 'Proposed Framework',
        content: 'A multi-tier allocation system based on project scope, community benefit, and alignment with ecosystem goals.',
      },
      {
        heading: 'Implementation',
        content: 'Quarterly review cycles with community voting on major allocations above defined thresholds.',
      },
    ],
  },
  {
    id: 'prop-002',
    title: 'AR Distribution Expansion Strategy',
    description: 'Proposal to expand AR token distribution to additional geographic regions and tourist hotspots.',
    category: 'Distribution',
    objective: 'Increase global reach and accessibility of QMY tokens through strategic AR distribution expansion.',
    impact: 'Broader geographic coverage leading to increased adoption and community engagement worldwide.',
    fullDetails: [
      {
        heading: 'Current State',
        content: 'AR distribution is currently focused on initial pilot regions with proven engagement metrics.',
      },
      {
        heading: 'Expansion Plan',
        content: 'Phased rollout to 50 new locations across 6 continents, prioritizing high-traffic tourist destinations.',
      },
      {
        heading: 'Success Metrics',
        content: 'Track user engagement, token claims, and community growth in new regions over 6-month periods.',
      },
    ],
  },
  {
    id: 'prop-003',
    title: 'Vesting Schedule Optimization',
    description: 'Review and optimize token vesting schedules to better align with long-term ecosystem sustainability.',
    category: 'Tokenomics',
    objective: 'Balance immediate liquidity needs with long-term holder incentives through optimized vesting.',
    impact: 'Improved token economics leading to more stable price discovery and reduced sell pressure.',
    fullDetails: [
      {
        heading: 'Analysis',
        content: 'Current vesting schedules have been analyzed for effectiveness in promoting long-term holding behavior.',
      },
      {
        heading: 'Proposed Changes',
        content: 'Gradual unlock curves with milestone-based accelerators for active community participants.',
      },
      {
        heading: 'Expected Outcomes',
        content: 'Reduced volatility, increased long-term holder base, and better alignment of incentives.',
      },
    ],
  },
  {
    id: 'prop-004',
    title: 'Developer Grant Program',
    description: 'Establish a grant program to fund developers building applications and tools for the Quantumoney ecosystem.',
    category: 'Development',
    objective: 'Accelerate ecosystem development by providing financial support to talented developers.',
    impact: 'Increased innovation, more applications, and stronger developer community engagement.',
    fullDetails: [
      {
        heading: 'Program Structure',
        content: 'Tiered grant system with small, medium, and large grants based on project scope and impact.',
      },
      {
        heading: 'Application Process',
        content: 'Open application system with community review and voting on grant proposals.',
      },
      {
        heading: 'Accountability',
        content: 'Milestone-based fund release with regular progress reports to the community.',
      },
    ],
  },
  {
    id: 'prop-005',
    title: 'Governance Participation Incentives',
    description: 'Introduce incentive mechanisms to encourage active participation in governance decisions.',
    category: 'Governance',
    objective: 'Increase voter turnout and community engagement in governance processes.',
    impact: 'More representative governance decisions reflecting broader community interests.',
    fullDetails: [
      {
        heading: 'Current Challenge',
        content: 'Low voter participation rates in governance decisions limit representativeness.',
      },
      {
        heading: 'Incentive Design',
        content: 'Reward active voters with governance tokens and reputation points for consistent participation.',
      },
      {
        heading: 'Safeguards',
        content: 'Anti-gaming mechanisms to prevent vote buying and ensure genuine community engagement.',
      },
    ],
  },
];

export function getPreProposals(): PreProposal[] {
  return preProposals;
}

export function getPreProposalById(id: string): PreProposal | undefined {
  return preProposals.find((p) => p.id === id);
}
