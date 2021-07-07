import * as React from 'react';
import { useParams } from 'react-router-dom';

import ds from 'lib/datasource';
import localStore from 'lib/local-store';
import { sanitizeAndExtraMarkdown } from 'lib/markdown';
import { navigateWithinEnv } from 'lib/utils/query-string';
import { ChangeLogValue, CHANGE_LOG_KEY } from 'lib/local-store/const';

import { Markdown } from 'ui/Markdown/Markdown';
import { Content } from 'ui/Content/Content';
import { Icon } from 'ui/Icon/Icon';

import './ChangeLog.scss';

interface IChangeLogItem {
    content: string;
    date: string;
}

const ChangeLogMarkdown: React.FC<{ markdown: string }> = ({ markdown }) => {
    const processedMarkdown = React.useMemo(() => {
        const [text, properties] = sanitizeAndExtraMarkdown(markdown);
        return 'title' in properties
            ? `# ${properties['title']}\n` + text
            : text;
    }, [markdown]);
    return (
        <Content>
            <Markdown>{processedMarkdown}</Markdown>
        </Content>
    );
};

export const ChangeLog: React.FunctionComponent = () => {
    const { date: changeLogDate }: any = useParams();
    const [changeLogContent, setChangeLogContent] = React.useState<string[]>(
        []
    );
    const [changeLogList, setChangeLogList] = React.useState<IChangeLogItem[]>(
        []
    );

    React.useEffect(() => {
        if (changeLogDate) {
            const currentLog = changeLogList.find(
                (log) => log.date === changeLogDate
            );
            if (currentLog) {
                setChangeLogContent([currentLog.content]);
            } else {
                ds.fetch(
                    `/utils/change_log/${changeLogDate}/`
                ).then(({ data }) => setChangeLogContent([data]));
            }
        } else {
            Promise.all([
                localStore.get<ChangeLogValue>(CHANGE_LOG_KEY),
                ds.fetch<IChangeLogItem[]>(`/utils/change_logs/`),
            ]).then(([localStorageDate, { data }]) => {
                setChangeLogList(data);

                const lastViewedDate = localStorageDate ?? '2000-01-01';
                const content = data
                    .filter((log) => log.date > lastViewedDate)
                    .map((log) => log.content);
                setChangeLogContent(content);
            });
        }
    }, [changeLogDate]);

    const changeLogDOM = changeLogContent.map((text, idx) => (
        <ChangeLogMarkdown markdown={text} key={idx} />
    ));
    const changeLogListDOM = changeLogDate ? null : (
        <div className="ChangeLog-list">
            <div className="ChangeLog-list-title mt12">Change Logs</div>
            {changeLogList.map((log) => (
                <div
                    className="ChangeLog-log-item horizontal-space-between mv8 mh12 pv12"
                    key={log.date}
                    onClick={() => navigateWithinEnv(`/changelog/${log.date}/`)}
                >
                    <div>{log.date}</div>
                    <div className="ChangeLog-arrow">
                        <Icon name="arrow-right" />
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="ChangeLog">
            {changeLogDOM}
            {changeLogListDOM}
        </div>
    );
};
