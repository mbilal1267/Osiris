import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ScrollArea } from '../ui/scroll-area';

interface Creator {
  id: number;
  name: string;
  handle: string;
  avatar: string;
  initials: string;
}

const mockCreators: Creator[] = [
  { id: 1, name: 'Sarah Johnson', handle: '@sarahjohnson', avatar: '', initials: 'SJ' },
  { id: 2, name: 'Mike Chen', handle: '@mikechen', avatar: '', initials: 'MC' },
  { id: 3, name: 'Emily Rodriguez', handle: '@emilyrodriguez', avatar: '', initials: 'ER' },
  { id: 4, name: 'David Park', handle: '@davidpark', avatar: '', initials: 'DP' },
  { id: 5, name: 'Lisa Anderson', handle: '@lisaanderson', avatar: '', initials: 'LA' },
  { id: 6, name: 'James Wilson', handle: '@jameswilson', avatar: '', initials: 'JW' },
];

export function TopCreatorsList() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Top Creators</h3>
      <ScrollArea className="h-[280px]">
        <div className="space-y-3">
          {mockCreators.map((creator) => (
            <div
              key={creator.id}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <Avatar className="w-10 h-10">
                <AvatarImage src={creator.avatar} alt={creator.name} />
                <AvatarFallback className="bg-blue-100 text-blue-700 text-sm font-medium">
                  {creator.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 truncate">{creator.name}</p>
                <p className="text-xs text-slate-500 truncate">{creator.handle}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
