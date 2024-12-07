export const exportJsonFile = (fileName: string, fileText: string): void =>  {


  const blob = new Blob([fileText], { type: 'application/json' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.click();
  window.URL.revokeObjectURL(url);

}
