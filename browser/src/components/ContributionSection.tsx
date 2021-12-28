function TermsOfUse() {
  return (
    <div className="terms">
      <ul className="list-disc list-inside">
        <li>
          I agree to using <em>pluriverse</em> appropriately
        </li>
        <li>...</li>
      </ul>
    </div>
  );
}

export function ContributionSection() {
  return (
    <div className="contributionSection">
      <h2 className="text-2xl font-bold">Contributions</h2>
      <TermsOfUse />
    </div>
  );
}
