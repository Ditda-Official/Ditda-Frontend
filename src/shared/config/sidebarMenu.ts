import {
  ExitBoldIcon,
  ExitIcon,
  FileBoldIcon,
  FileIcon,
  FileImageBoldIcon,
  FileImageIcon,
  ProfileCircleBoldIcon,
  ProfileCircleIcon,
  SearchBoldIcon,
  SearchIcon,
} from "@/shared/assets/icons";

type IconComponent = React.FC<React.SVGProps<SVGSVGElement>>;

export const SIDEBAR_ICON_MAP: Record<string, { icon: IconComponent; boldIcon: IconComponent }> = {
  "현재 외주": { icon: FileIcon, boldIcon: FileBoldIcon },
  "외주 찾기": { icon: SearchIcon, boldIcon: SearchBoldIcon },
  마이페이지: { icon: ProfileCircleIcon, boldIcon: ProfileCircleBoldIcon },
  로그아웃: { icon: ExitIcon, boldIcon: ExitBoldIcon },
  "새 외주 작성": { icon: FileIcon, boldIcon: FileBoldIcon },
  "진행 중 외주": { icon: FileImageIcon, boldIcon: FileImageBoldIcon },
};
