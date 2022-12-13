import { BaseBadge } from '../../components/base_badge';

const DashboardPage = () => (
  <div id="dashboard-page" className="dashboard-page">
    <h1>Dashboard Page</h1>
    <div>
      <BaseBadge
        id="cat-general"
        name="General"
      />
    </div>
  </div>
);

export default DashboardPage;
