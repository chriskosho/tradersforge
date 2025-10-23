// components/Disclaimer.tsx
import React from 'react';

export const Disclaimer: React.FC = () => (
  <div className="mt-8 w-full rounded-lg bg-slate-50 dark:bg-neutral-900 p-4 border-l-4 border-slate-200 dark:border-neutral-800">
    <p className="text-sm text-slate-700 dark:text-neutral-300 italic leading-relaxed">
      I am not a financial advisor. The content shared on this blog is for{' '}
      <strong>educational and informational purposes only</strong> and should not be
      considered financial or investment advice. Trading involves risk, and you should
      only trade with capital you can afford to lose.
      <br />
      <br />
      All thoughts and opinions expressed here are my own and{' '}
      <strong>do not represent any trading systems, communities, or businesses</strong>{' '}
      with which I may be associated.
    </p>
  </div>
);

export default Disclaimer;
