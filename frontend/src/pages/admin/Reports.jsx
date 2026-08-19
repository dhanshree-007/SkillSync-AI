import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { FileText, Download } from 'lucide-react';
import { useToast } from '../../components/common/Toast';

export default function Reports() {
  const { addToast } = useToast();

  const handleDownload = (reportName) => {
    addToast(`Generating ${reportName} report... Download will begin shortly.`, 'success');
  };

  const reportsList = [
    { name: 'Monthly User Growth', format: 'CSV', size: '1.2 MB' },
    { name: 'Platform Revenue Summary (Q3)', format: 'PDF', size: '2.5 MB' },
    { name: 'AI API Usage Logs', format: 'CSV', size: '5.8 MB' },
    { name: 'Active Jobs & Placements', format: 'Excel', size: '3.1 MB' },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-heading font-bold text-slate-900 dark:text-white">Platform Reports</h1>
        <p className="text-slate-600 dark:text-slate-400">Generate and download historical data for analysis.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Available Reports</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {reportsList.map((report, i) => (
            <div key={i} className="flex items-center justify-between p-4 border border-slate-100 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-900/50">
              <div className="flex items-center">
                <div className="p-2 bg-brand-100 dark:bg-brand-900/50 text-brand-500 rounded-lg mr-4">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">{report.name}</h4>
                  <p className="text-sm text-slate-500">{report.format} • {report.size}</p>
                </div>
              </div>
              <Button variant="outline" onClick={() => handleDownload(report.name)}>
                <Download className="w-4 h-4 mr-2" /> Download
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
