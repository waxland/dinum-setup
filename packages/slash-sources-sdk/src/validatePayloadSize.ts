export function validatePayloadSize(rawPayload: unknown, maxBytes: number = 64 * 1024): unknown {
  if (rawPayload === undefined || rawPayload === null) {
    return rawPayload;
  }

  let serialized: string;
  try {
    serialized = JSON.stringify(rawPayload);
  } catch {
    // If it cannot be serialized (e.g., circular references), we consider it invalid.
    return {
      _error: "PAYLOAD_UNSERIALIZABLE",
      _message: "Payload could not be serialized to JSON.",
    };
  }

  if (serialized === undefined) {
    return rawPayload;
  }

  // Use TextEncoder to get the exact UTF-8 byte length
  const byteLength = new TextEncoder().encode(serialized).length;

  if (byteLength > maxBytes) {
    return {
      _error: "PAYLOAD_TOO_LARGE",
      _message: `Payload size (${byteLength} bytes) exceeds the maximum allowed size of ${maxBytes} bytes.`,
    };
  }

  return rawPayload;
}
