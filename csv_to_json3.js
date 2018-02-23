const stream = require('stream');
const fs = require('fs');
const readline = require('readline');

const table1 = {}; // having content of table for graph1
const table2 = {}; // having content of table for graph2
let header = []; // having name of columns


function fun() {
  const ostream = fs.createWriteStream('age_group.json');
  const ostream2 = fs.createWriteStream('education_group.json');

  let fileread = 0; // for terminating loop at reading the files
  const file = ['./India2011.csv', './IndiaSC2011.csv', './IndiaST2011.csv'];

  let row = [];
  file.forEach((listitem) => {
    let i = 0;

    const instream = fs.createReadStream(listitem);
    const Outstream = new stream();
    const rl = readline.createInterface(instream, Outstream);
    rl.on('line', (line) => {
      row = line.toString().split(','); // reading each rows in the csv file and save it into an array

      if (i === 0) {
        header = line.toString().split(',');

        i += 1;
      } else if (row[4] === 'Total' && row[5] !== 'All ages' && row[5] !== '0-6' && row[5] !== 'Age not stated') {
        if (row[5] in table1) {
          table1[row[5]] += parseInt(row[6], 10);
        } else {
          table1[row[5]] = parseInt(row[6], 10);
        }
        if (header[15] in table2) {
          table2[header[15]] += parseInt(row[15], 10);
        } else {
          table2[header[15]] = parseInt(row[15], 10);
        }
        if (header[18] in table2) {
          table2[header[18]] += parseInt(row[18], 10);
        } else {
          table2[header[18]] = parseInt(row[18], 10);
        }
        if (header[21] in table2) {
          table2[header[21]] += parseInt(row[21], 10);
        } else {
          table2[header[21]] = parseInt(row[21], 10);
        }
        if (header[24] in table2) {
          table2[header[24]] += parseInt(row[24], 10);
        } else {
          table2[header[24]] = parseInt(row[24], 10);
        }
        if (header[27] in table2) {
          table2[header[27]] += parseInt(row[27], 10);
        } else {
          table2[header[27]] = parseInt(row[27], 10);
        }
        if (header[30] in table2) {
          table2[header[30]] += parseInt(row[30], 10);
        } else {
          table2[header[30]] = parseInt(row[30], 10);
        }
        if (header[33] in table2) {
          table2[header[33]] += parseInt(row[33], 10);
        } else {
          table2[header[33]] = parseInt(row[33], 10);
        }
        if (header[36] in table2) {
          table2[header[36]] += parseInt(row[36], 10);
        } else {
          table2[header[36]] = parseInt(row[36], 10);
        }
        if (header[39] in table2) {
          table2[header[39]] += parseInt(row[39], 10);
        } else {
          table2[header[39]] = parseInt(row[39], 10);
        }
      }


      // process line here
    });
    rl.on('close', () => {
      fileread += 1;
      if (fileread === 3) {
        ostream.write('[\n');
        let isFirstEntery = true;

        Object.keys(table1).forEach((k) => {
          if (isFirstEntery) {
            ostream.write(`{\n\t"age_group" : "${k}",\n\t"number" : ${table1[k]}}\n`);
            isFirstEntery = !isFirstEntery;
          } else { ostream.write(`,{\n\t"age_group" : "${k}",\n\t"number" : ${table1[k]}}\n`); }
        });
        ostream.write(']\n');
        ostream.end();
        ostream2.write('[\n');
        let isFirstEntery1 = true;
        let string2 = '';
        Object.keys(table2).forEach((l) => {
          string2 = l.trim().replace('Educational', '').replace('level', '').replace('Persons', '')
            .replace('-', '')
            .trim();
          string2 = string2.replace('-', '');
          string2 = string2.replace('-', '');
          if (isFirstEntery1) {
            ostream2.write(`{\n\t"education" : "${string2}",\n\t"number" : ${table2[l]}}\n`);
            isFirstEntery1 = !isFirstEntery1;
          } else { ostream2.write(`,{\n\t"education" : "${string2}",\n\t"number" : ${table2[l]}}\n`); }
        });
        ostream2.write(']\n');
        ostream2.end();
      }
    });
  });
}
fun();
