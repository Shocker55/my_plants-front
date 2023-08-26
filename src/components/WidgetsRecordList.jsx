import Link from "next/link";

export default function WidgetsRecordList({ userRecords }) {
  return (
    <div className="min-h-[500px]">
      <h4 className="px-4 text-xl font-bold">Records</h4>
      {userRecords
        ?.filter((record) => record.base === true)
        .map((baseRecord) => {
          return (
            <li key={baseRecord.id} className="pl-5 pt-2">
              <Link href={`/records/${baseRecord.id}`}>{baseRecord.title}</Link>
              {userRecords
                ?.filter((record) => record.related_records[0]?.related_record_id === baseRecord.id)
                .map((relatedRecord) => {
                  return (
                    <li key={relatedRecord.id} className="pl-6">
                      <Link href={`/records/${relatedRecord.id}`}>{relatedRecord.title}</Link>
                    </li>
                  );
                })}
            </li>
          );
        })}
    </div>
  );
}
