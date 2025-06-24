import { MessageCircle } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Link, useParams } from 'react-router-dom';

const chatHistory = [
  {
    id: 1,
    sender: 'MindMate',
    message: 'Hello, how can I assist you today?',
    timestamp: '2025-05-04 10:00 AM',
  },
  {
    id: 2,
    sender: 'User',
    message: "I'm feeling a bit anxious today.",
    timestamp: '2025-05-04 10:05 AM',
  },
  {
    id: 3,
    sender: 'MindMate',
    message: "I'm sorry to hear that. Do you want to talk about it?",
    timestamp: '2025-05-04 10:06 AM',
  },
  {
    id: 4,
    sender: 'User',
    message: 'Yes, I need some tips on managing stress.',
    timestamp: '2025-05-04 10:07 AM',
  },
];

export function AppSidebar() {
  const session = useParams().session as string;

  return (
    <Sidebar className="bg-[#181818] text-white">
      <SidebarContent className="bg-[#181818] text-white">
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg text-white font-semibold py-4 px-0">
            Chat History
          </SidebarGroupLabel>
          <SidebarMenu>
            {chatHistory.map((chat, index) => (
              <SidebarMenuItem key={index}>
                <SidebarMenuButton
                  asChild
                  isActive={chat.id == parseInt(session) ? true : false}
                  className="flex items-center text-white justify-center cursor-pointer h-auto"
                >
                  <Link
                    to={`/chat/${chat.id}`}
                    className="flex items-start space-x-1 py-3  rounded-md hover:bg-gray-700"
                  >
                    <MessageCircle className="" />
                    <div className="flex flex-col">
                      <span className="font-semibold text-sm">
                        {chat.sender}
                      </span>
                      <span className="text-sm text-gray-400 line-clamp-1">
                        {chat.message}
                      </span>
                      <span className="text-xs text-gray-500">
                        {chat.timestamp}
                      </span>
                    </div>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
