import { Activity, CheckCircle as CheckCircleIcon, Download as DownloadIcon, Edit3, Eye, Gavel as GavelIcon, History as HistoryIcon, Trash2, User, ShieldCheck } from 'lucide-react';

const iconClass = 'h-5 w-5';

export const Analytics = () => <Activity className={iconClass} />;
export const CheckCircle = () => <CheckCircleIcon className={iconClass} />;
export const Delete = () => <Trash2 className={iconClass} />;
export const Download = () => <DownloadIcon className={iconClass} />;
export const EditNote = () => <Edit3 className={iconClass} />;
export const Gavel = () => <GavelIcon className={iconClass} />;
export const History = () => <HistoryIcon className={iconClass} />;
export const Person = () => <User className={iconClass} />;
export const Security = () => <ShieldCheck className={iconClass} />;
export const Visibility = () => <Eye className={iconClass} />;
