import { ChangelogEntry, ChangelogEntrySummary } from 'sc-changelog/src/types/changeLogEntry';
import { slugify } from 'sc-changelog/src/utils/stringUtils';

const publicUrl = process.env.NEXT_PUBLIC_PUBLIC_URL ? process.env.NEXT_PUBLIC_PUBLIC_URL : '';

export function getChangelogEntryUrlSegments(entry: ChangelogEntry | ChangelogEntrySummary): string[] {
  const segments: string[] = [];

  segments.push(slugify(entry.productName ?? entry.title));
  //segments.push(slugify(entry.changeTypeName));
  segments.push(`${slugify(entry.title)}`);

  return segments;
}

export function getChangelogEntryUrl(entry: ChangelogEntry | ChangelogEntrySummary, includeServerUrl?: boolean): string {
  const url: string[] = [];

  url.push('/changelog');
  url.push(...getChangelogEntryUrlSegments(entry));

  if (includeServerUrl) return `${publicUrl + url.join('/')}`;

  return url.join('/');
}
