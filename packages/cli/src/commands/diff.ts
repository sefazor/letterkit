import pc from 'picocolors';

/**
 * Show diff between local block and upstream registry version.
 *
 * TODO: Implement file-level diff against registry source.
 */
export async function diffCommand(blockName: string): Promise<void> {
  console.log(pc.yellow(`diff for "${blockName}" is not yet implemented.`));
  console.log(pc.dim('TODO: Compare local block files with registry upstream and show changes.'));
}
