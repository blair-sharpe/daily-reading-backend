import {
  GoogleGenerativeAI,
  GenerativeModel,
  GenerateContentResult,
} from '@google/generative-ai';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GeminiApiProvider {
  private GenAi: GoogleGenerativeAI;
  private model: GenerativeModel;
  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY');
    this.GenAi = new GoogleGenerativeAI(apiKey);
    this.model = this.GenAi.getGenerativeModel({ model: 'gemini-1.5-flash' });
  }
  async getSummary(passage: string): Promise<GenerateContentResult> {
    const contents = `Generate a summary of the following passage: ${passage} under 100 words.`;
    const response = await this.model.generateContent(contents);
    return response;
  }
}
