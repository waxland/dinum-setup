import React, { useState } from "react";

export function ApiSimulator() {
  const [quota, setQuota] = useState(10);
  const [circuitOpen, setCircuitOpen] = useState(false);
  const [logs, setLogs] = useState<
    { id: number; time: string; msg: string; type: "success" | "error" | "warn" }[]
  >([]);

  const addLog = (msg: string, type: "success" | "error" | "warn") => {
    setLogs((prev) =>
      [{ id: Date.now(), time: new Date().toLocaleTimeString(), msg, type }, ...prev].slice(0, 5),
    );
  };

  const simulateCall = () => {
    if (circuitOpen) {
      addLog("HTTP 503 : Circuit Breaker ouvert (Fail Fast)", "error");
      return;
    }

    if (quota <= 0) {
      addLog("HTTP 429 : Quota journalier atteint (Rate Limit)", "error");
      setCircuitOpen(true);
      setTimeout(() => {
        setCircuitOpen(false);
        addLog("Circuit Breaker refermé (Half-Open -> Closed)", "warn");
      }, 5000);
      return;
    }

    setQuota((q) => q - 1);
    addLog(`HTTP 200 : Données récupérées (Reste ${quota - 1} jetons)`, "success");
  };

  const resetSimulator = () => {
    setQuota(10);
    setCircuitOpen(false);
    addLog("Simulateur réinitialisé", "warn");
  };

  return (
    <div className="not-prose my-6 p-6 border rounded-xl bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-4">
          <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            📊 État du Proxy Redis
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
              <span className="text-sm text-gray-600 dark:text-gray-400">Quota (Token Bucket)</span>
              <span
                className={`font-mono font-bold ${quota > 3 ? "text-emerald-600" : "text-amber-500"}`}
              >
                {quota} / 10
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
              <span className="text-sm text-gray-600 dark:text-gray-400">Circuit Breaker</span>
              <span
                className={`font-mono font-bold ${circuitOpen ? "text-red-500" : "text-emerald-600"}`}
              >
                {circuitOpen ? "OUVERT" : "FERMÉ"}
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={simulateCall}
              className="flex-1 py-2 px-4 bg-[#000091] hover:bg-[#1212ff] text-white text-sm font-medium rounded-md transition-colors"
            >
              Envoyer Requête API
            </button>
            <button
              onClick={resetSimulator}
              className="py-2 px-4 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm font-medium rounded-md transition-colors"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            📝 Logs du Trafic
          </div>
          <div className="flex-1 bg-gray-900 rounded-lg p-3 overflow-y-auto font-mono text-xs min-h-[150px]">
            {logs.length === 0 ? (
              <div className="text-gray-500 italic h-full flex items-center justify-center">
                En attente de requêtes...
              </div>
            ) : (
              <div className="space-y-2">
                {logs.map((log) => (
                  <div key={log.id} className="flex gap-2">
                    <span className="text-gray-500">[{log.time}]</span>
                    <span
                      className={
                        log.type === "success"
                          ? "text-emerald-400"
                          : log.type === "error"
                            ? "text-red-400"
                            : "text-amber-400"
                      }
                    >
                      {log.msg}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
