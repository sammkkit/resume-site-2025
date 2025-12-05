import {
    Smartphone, Brain, Camera, ExternalLink, Github,
    Code2, Layout, Cpu, Terminal, Database,
    Briefcase, GraduationCap, Calendar, Send, Mail, MapPin, Phone,
    Trophy, Star, Code
} from "lucide-react";

export const Icons: any = {
    Smartphone, Brain, Camera, ExternalLink, Github,
    Code2, Layout, Cpu, Terminal, Database,
    Briefcase, GraduationCap, Calendar, Send, Mail, MapPin, Phone,
    Trophy, Star, Code
};

export const getIcon = (name: string) => {
    const IconComponent = Icons[name];
    return IconComponent ? IconComponent : Code; // Default icon
};
