import { useState } from "react";

export function useGenerateUserQrCode(endpoint) {
  const [loadingQRCode, setLoadingQRCode] = useState(true);
  const code = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${endpoint}`;

  return { code, loadingQRCode, setLoadingQRCode };
}
