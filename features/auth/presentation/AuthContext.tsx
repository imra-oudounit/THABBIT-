// Re-export the legacy AuthContext from its original location so existing
// screens keep working unchanged. The provider already wires onAuthStateChanged
// to Firebase Auth — the new feature layer can read the same state.
export { AuthProvider, useAuth } from "../../../context/AuthContext";
