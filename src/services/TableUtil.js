export function parseMarkdown(markdown) {

  const lines = markdown.match(/.+/g);
  const rows = [];
  const maxColumnLength = [];
  const columnsAlignment = [];

  lines.forEach((line, i) => {
 
    // Headers must always exists for most parsers, so we assume this line is the delimiter:
    if (i === 1) {
      const delimiters = line.split(/\|/g);
      
      for (let row of delimiters) {
        
        if (row.trim().length > 0) {
          if (row.split(":").length === 3) {
            columnsAlignment.push('center')
          }
          else if (row.includes(":---")) {
            columnsAlignment.push('left');
          }
          else if (row.includes("---:")) {
            columnsAlignment.push('right');
          }
          else {
            columnsAlignment.push(null);
          }
        }
        
      }

      return;
    }

    // ! Negative lookbehind would solve it in one line, but it's only supported by Chrome ;(
    // const rows = line.split(/(?<!\\)\|/g);
    
    // Instead, we have to do this:
    const parsedRow = line.split(/\|/g);
    for (let i = 0; i < parsedRow.length-1; i++) {
      
      if (parsedRow[i].endsWith('\\')) {
        for (let j = i + 1; j < parsedRow.length; j++) {
          
          parsedRow[i] += `|${parsedRow[j]}`;
          const lastRow = parsedRow[j];
          parsedRow[j] = '';

          if (!lastRow.endsWith('\\')) {
            break;
          }
        }
      }
    }

    rows.push([]);

    let rowIndex = 0;

    parsedRow.forEach(row => {
      const trimRow = row.trim();
      
      if (row.length > 0) {
        rows[rows.length -1].push(trimRow);
        maxColumnLength[rowIndex] = Math.max(trimRow.length, maxColumnLength[rowIndex] || 0);

        rowIndex++;
      }
    })
  });

  return { rows, maxColumnLength, columnsAlignment };
}

export function getDimensions(immutableRows) {
  
  let rowCount = 0;
  let columnCount = 0;

  rowCount = immutableRows.size;
  columnCount = immutableRows.first().size;

  return { rowCount, columnCount };
}

export function calculateMaxLength(immutableRows, columnIndex) {

  let maxColumnLength = 0;

  immutableRows.forEach(row => {
    let cell = row.get(columnIndex) || '';

    if (cell.endsWith('<br>')) {
      cell = cell.slice(0, -4);
    }

    maxColumnLength = Math.max(cell.length, maxColumnLength);
  });

  return maxColumnLength;
}

export function unescapeMarkdown(markdown) {
  let string = markdown || '';
  
  string = string.replace(/\\\|/g, '|');

  const lines = string.split('<br>');

  for (let key in HTML_ENTITIES) {
    for (let i = 0; i < lines.length; i++) {
      lines[i] = lines[i].replace(new RegExp(HTML_ENTITIES[key], 'g'), key);
    }
  }

  return lines.join('<br>');
}

const HTML_ENTITIES = {
  '&amp;'  : '&',
  '&lt;'   : '<',
  '&gt;'   : '>',
  '&nbsp;' : ' ',
  //'<b>'    : '**',
  //'</b>'   : '**',
};

export function htmlToMarkdown(html) {
  let markdown = html || '';
  
  for (let key in HTML_ENTITIES) {
    markdown = markdown.replace(new RegExp(key, 'g'), HTML_ENTITIES[key]);
  }

  markdown = markdown.replace(/\|/g, '\\|');

  return markdown;
}