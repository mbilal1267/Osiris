import { FileText, Trash2, Send } from 'lucide-react';
import { Button } from '../ui/button';

export function ActionCard() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-6">Actions</h3>
      <div className="flex flex-col gap-3">
        {/* Primary Action Button */}
        <Button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-5 rounded-lg transition-colors"
        >
          <Send className="w-4 h-4 mr-2" />
          Invite to Campaign
        </Button>

        {/* Secondary Action Button */}
        <Button
          variant="outline"
          className="w-full border-slate-300 text-slate-700 hover:bg-slate-50 font-medium py-5 rounded-lg transition-colors"
        >
          <FileText className="w-4 h-4 mr-2" />
          Export CSV
        </Button>

        {/* Tertiary Action Link */}
        <button className="w-full text-red-600 hover:text-red-700 font-medium py-3 rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center">
          <Trash2 className="w-4 h-4 mr-2" />
          Clear Shortlist
        </button>
      </div>
    </div>
  );
}
