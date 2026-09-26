import { Injectable, computed, signal } from '@angular/core';
import { InvitationContent, SectionConfig, ThemeConfig } from '../models/invitation.model';

export type ViewportMode = 'desktop' | 'tablet' | 'mobile';

@Injectable({
  providedIn: 'root'
})
export class EditorStateService {
  // Core State Signals
  private state = signal<InvitationContent | null>(null);
  private selectedSectionId = signal<string | null>(null);
  private viewport = signal<ViewportMode>('desktop');
  
  // History State
  private history: string[] = [];
  private historyIndex = -1;
  private isUndoRedoing = false;

  // Computed Selectors
  readonly invitation = this.state.asReadonly();
  readonly sections = computed(() => this.state()?.sections || []);
  readonly theme = computed(() => this.state()?.theme || null);
  readonly selectedSection = computed(() => {
    const id = this.selectedSectionId();
    return this.sections().find(s => s.id === id) || null;
  });
  readonly currentViewport = this.viewport.asReadonly();

  // Load Initial State
  loadInvitation(content: InvitationContent) {
    this.state.set(content);
    this.resetHistory(content);
  }

  // Viewport
  setViewport(mode: ViewportMode) {
    this.viewport.set(mode);
  }

  // Selection
  selectSection(id: string | null) {
    this.selectedSectionId.set(id);
  }

  // Updates
  updateTheme(theme: Partial<ThemeConfig>) {
    const current = this.state();
    if (!current) return;
    const newState = {
      ...current,
      theme: { ...current.theme, ...theme }
    };
    this.saveState(newState);
  }

  updateSection(sectionId: string, updates: Partial<SectionConfig>) {
    const current = this.state();
    if (!current) return;
    
    const newSections = current.sections.map(s => 
      s.id === sectionId ? { ...s, ...updates } : s
    );
    
    this.saveState({ ...current, sections: newSections });
  }

  updateSectionData(sectionId: string, dataUpdates: any) {
    const current = this.state();
    if (!current) return;
    
    const newSections = current.sections.map(s => 
      s.id === sectionId ? { ...s, data: { ...s.data, ...dataUpdates } } : s
    );
    
    this.saveState({ ...current, sections: newSections });
  }

  reorderSections(previousIndex: number, currentIndex: number) {
    const current = this.state();
    if (!current) return;
    
    const newSections = [...current.sections];
    const [moved] = newSections.splice(previousIndex, 1);
    newSections.splice(currentIndex, 0, moved);
    
    this.saveState({ ...current, sections: newSections });
  }

  deleteSection(sectionId: string) {
    const current = this.state();
    if (!current) return;
    
    const newSections = current.sections.filter(s => s.id !== sectionId);
    
    if (this.selectedSectionId() === sectionId) {
      this.selectedSectionId.set(null);
    }
    
    this.saveState({ ...current, sections: newSections });
  }

  addSection(section: SectionConfig, index?: number) {
    const current = this.state();
    if (!current) return;
    
    const newSections = [...current.sections];
    if (index !== undefined && index >= 0) {
      newSections.splice(index, 0, section);
    } else {
      newSections.push(section);
    }
    
    this.saveState({ ...current, sections: newSections });
    this.selectSection(section.id);
  }

  duplicateSection(sectionId: string) {
    const current = this.state();
    if (!current) return;
    
    const index = current.sections.findIndex(s => s.id === sectionId);
    if (index === -1) return;
    
    const sectionToDuplicate = current.sections[index];
    const newSection = {
      ...JSON.parse(JSON.stringify(sectionToDuplicate)),
      id: this.generateId()
    };
    
    this.addSection(newSection, index + 1);
  }

  // Undo/Redo & Persistence
  private saveState(newState: InvitationContent) {
    this.state.set(newState);
    if (!this.isUndoRedoing) {
      this.pushHistory(newState);
    }
    // Local save
    localStorage.setItem('bulawa_draft_' + newState.templateId, JSON.stringify(newState));
  }

  private resetHistory(initialState: InvitationContent) {
    this.history = [JSON.stringify(initialState)];
    this.historyIndex = 0;
  }

  private pushHistory(state: InvitationContent) {
    const serialized = JSON.stringify(state);
    if (this.history[this.historyIndex] === serialized) return;
    
    // Truncate future history if we're branching
    this.history = this.history.slice(0, this.historyIndex + 1);
    this.history.push(serialized);
    this.historyIndex++;
  }

  canUndo(): boolean {
    return this.historyIndex > 0;
  }

  canRedo(): boolean {
    return this.historyIndex < this.history.length - 1;
  }

  undo() {
    if (!this.canUndo()) return;
    this.isUndoRedoing = true;
    this.historyIndex--;
    const state = JSON.parse(this.history[this.historyIndex]);
    this.state.set(state);
    localStorage.setItem('bulawa_draft_' + state.templateId, JSON.stringify(state));
    this.isUndoRedoing = false;
  }

  redo() {
    if (!this.canRedo()) return;
    this.isUndoRedoing = true;
    this.historyIndex++;
    const state = JSON.parse(this.history[this.historyIndex]);
    this.state.set(state);
    localStorage.setItem('bulawa_draft_' + state.templateId, JSON.stringify(state));
    this.isUndoRedoing = false;
  }

  generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
