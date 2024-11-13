import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { issuesStore } from '../stores/issuesStore';

interface GridProps {
  rowsPerPage?: number;
}

const Grid: React.FC<GridProps> = observer(({ rowsPerPage = 30 }) => {
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop === clientHeight) {
      issuesStore.fetchIssues();
    }
  };

  useEffect(() => {
    issuesStore.setRepo('your-repo-name'); // Укажите репозиторий при загрузке
  }, []);

  return (
    <div className="grid-container" onScroll={handleScroll} style={{ overflowY: 'auto', maxHeight: '600px' }}>
      {issuesStore.issues.map((issue, index) => (
        <div key={issue.id} className="issue-item">
          <h3>{issue.title}</h3>
          <p>{issue.body}</p>
        </div>
      ))}
    </div>
  );
});

export default Grid;