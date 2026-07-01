export interface SearchResult {
  id: string;
  title: string;
  subtitle?: string;
  type: "surah" | "verse" | "word";
}
