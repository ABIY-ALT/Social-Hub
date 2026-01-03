
import { httpsCallable } from 'firebase/functions';
import { functions, db } from '@/lib/firebase';
import type { ContentGenerationRequest, ContentGenerationResponse } from '@/types';
import { doc, setDoc, serverTimestamp, collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { nanoid } from 'nanoid';

export class ContentService {
  // Call Firebase Function for content generation
  static async generateContent(request: ContentGenerationRequest): Promise<ContentGenerationResponse> {
    try {
      const generateContentFunction = httpsCallable<ContentGenerationRequest, ContentGenerationResponse>(
        functions,
        'generateContent'
      );
      
      const result = await generateContentFunction(request);
      return result.data;
    } catch (error: any) {
      console.error("Error generating content:", error);
      throw new Error(error.message || 'Failed to generate content');
    }
  }

  // Save content to Firestore
  static async saveContent(content: any) {
    const contentId = nanoid();
    const contentRef = doc(db, 'content', contentId);
    
    await setDoc(contentRef, {
      ...content,
      id: contentId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return contentId;
  }

  // Get user's content history
  static async getContentHistory(userId: string) {
    const contentRef = collection(db, 'content');
    const q = query(
      contentRef,
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
}
