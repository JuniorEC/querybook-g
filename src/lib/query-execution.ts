export function getStatementExecutionResultDownloadUrl(id: number) {
    return `${window.location.protocol}//${window.location.hostname}/ds/statement_execution/${id}/result/download/`;
}
