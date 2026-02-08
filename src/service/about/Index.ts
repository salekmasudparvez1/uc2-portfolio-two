import type { IPortfolioData } from "../../data/portfolioData";


type UploadType = "profile" | "hero" | "project" | "other" | `project_${number}`;

interface UploadResponse {
  success: boolean;
  data?: IPortfolioData;
  error?: string;
}

const API_URL = "/api/upload";

export const uploadService = {
  async uploadImage(
    file: File,
    type: UploadType
  ): Promise<IPortfolioData | null> {

    if (!file.type.startsWith("image/")) {
      throw new Error("Only image files are allowed");
    }

    if (file.size > 5 * 1024 * 1024) {
      throw new Error("Image size must be under 5MB");
    }


    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);


    const res = await fetch(API_URL, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error("Upload failed");
    }

    const result: UploadResponse = await res.json();

    if (!result.success || !result.data) {
      throw new Error(result.error || "Unknown upload error");
    }

    return result.data;
  },
};
