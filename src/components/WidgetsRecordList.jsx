import Link from "next/link";

export default function WidgetsRecordList({ userRecords, type }) {
  return (
    <div className="min-h-[500px]">
      <h4 className="px-4 text-xl font-bold">観察記録</h4>
      {type === "index" ? (
        <>
          {userRecords
            ?.filter((record) => record.base === true)
            .map((baseRecord) => {
              return (
                <ul key={baseRecord.id} className="pl-5 pt-2">
                  <li className="ml-5 list-disc">
                    <Link href={`/records/${baseRecord.id}`}>{baseRecord.title}</Link>
                    <ul>
                      {userRecords
                        ?.filter(
                          (record) => record.related_records[0]?.related_record_id === baseRecord.id
                        )
                        .map((relatedRecord) => {
                          return (
                            <li key={relatedRecord.id} className="ml-5 list-disc">
                              <Link href={`/records/${relatedRecord.id}`}>
                                {relatedRecord.title}
                              </Link>
                            </li>
                          );
                        })}
                    </ul>
                  </li>
                </ul>
              );
            })}
        </>
      ) : null}
      {type === "show" ? (
        <>
          <ul className="pl-5 pt-2">
            <li className="ml-5 list-disc">
              <Link href={`/records/${userRecords.baseRecord.id}`}>
                {userRecords.baseRecord.title}
              </Link>
              <ul>
                {userRecords.childRecords.map((relatedRecord) => {
                  return (
                    <li key={relatedRecord.id} className="ml-5 list-disc">
                      <Link href={`/records/${relatedRecord.id}`}>{relatedRecord.title}</Link>
                    </li>
                  );
                })}
              </ul>
            </li>
          </ul>
        </>
      ) : null}
    </div>
  );
}
