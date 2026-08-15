/**
 * 🎨 Flowdee Component Library
 * Architecture basée sur la nomenclature Figma
 * 
 * Structure:
 * - Button/* : Composants boutons (CTA, ScrollToTop, etc.)
 * - Card/* : Composants cartes (CaseStudy, Pricing, Feature, etc.)
 * - Section/* : Sections de page (Hero, Services, About, etc.)
 * - Nav/* : Composants de navigation (Header, etc.)
 * - Layout/* : Composants de mise en page
 * - Form/* : Composants de formulaires
 * - Badge/* : Tags et badges
 */

// ===== NAV =====
export * from './Nav';

// ===== BUTTONS =====
export * from './Button';

// ===== CARDS =====
export * from './Card';

// ===== SECTIONS =====
export * from './Section';

// ===== UI COMPONENTS (shadcn/ui) =====
export { Button, buttonVariants } from './ui/button';
export { Badge } from './ui/badge';
export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from './ui/card';
export { Input } from './ui/input';
export { Label } from './ui/label';
export { Textarea } from './ui/textarea';
export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
export { Checkbox } from './ui/checkbox';
export { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
export { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
export { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

// ===== UTILITY COMPONENTS =====
export { CustomCursor } from './CustomCursor';
export { ImageWithFallback } from './figma/ImageWithFallback';

// ===== DECORATIVE =====
export { DecorKeylines } from './Decor/Keylines';

// ===== LEGACY COMPONENTS (backwards compatibility) =====
export { Navigation } from './Navigation';
export { DarkModeToggle } from './DarkModeToggle';
export { ProjectCard } from './ProjectCard';
export { ScrollToTop } from './ScrollToTop';
export { TrustedClients } from './TrustedClients';
export { UseCases } from './UseCases';
export { ProblemCards } from './ProblemCards';
export { AIGuardrails } from './AIGuardrails';
export { FinalCTA } from './FinalCTA';