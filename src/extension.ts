import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  const strongifyDisposable = vscode.commands.registerCommand(
    'strongify.strong',
    strongify,
  );
  context.subscriptions.push(strongifyDisposable);

  const italicizeDisposable = vscode.commands.registerCommand(
    'strongify.italic',
    italicize,
  );
  context.subscriptions.push(italicizeDisposable);

  console.log('Strongify extension is now active!');
}

export function deactivate() {}

const strongify = () => {
  return tagText('strong');
};

const italicize = () => {
  return tagText('em');
};

const tagText = (tag: string) => {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showErrorMessage('No active text editor found');
    return;
  }

  // get selected text
  const selection = editor.selection;
  const selectedText = editor.document.getText(selection);

  if (selectedText.length === 0) {
    vscode.window.showErrorMessage('No text selected');
    return;
  }

  const taggedText = `<${tag}>${selectedText}</${tag}>`;

  editor.edit((editBuilder) => {
    editBuilder.replace(selection, taggedText);
  });
};
