import React, { useEffect, useState } from "react";
import { supabase } from "../../integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";

export default function ActivityLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("admin_actions")
      .select("*")
      .order("created_at", { ascending: false });

    setLoading(false);

    if (error) {
      console.error(error);
      return;
    }

    setLogs(data || []);
  };

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>Admin Activity Logs</CardTitle>
        </CardHeader>

        <CardContent>
          {loading ? (
            <p>Loading...</p>
          ) : logs.length === 0 ? (
            <p>No activity yet.</p>
          ) : (
            <div className="space-y-4">
              {logs.map((log) => (
                <div
                  key={log.id}
                  className="border rounded p-3 flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold">{log.action}</p>
                    <p className="text-sm text-muted-foreground">
                      {log.admin_email}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Details: {JSON.stringify(log.details)}
                    </p>
                  </div>
                  <p className="text-xs text-gray-600">
                    {new Date(log.created_at).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}