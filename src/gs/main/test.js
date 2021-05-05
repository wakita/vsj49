function pageTest() {
  const form = new MyForm('https://docs.google.com/forms/d/1_r5EcQsmk7Gec1ajbDZXrT2ilEdN0gpEyjxbPao5-80/');
  form.clear();

  const author = [''];
  const author_done = [''];

  for (var i = 1; i < 4; i++) {
    author.push(form.page(`Author ${i}`));
    author_done.push(form.form.addListItem().setTitle('Add more author(s)?'));
  }
  author.push(form.page('Author 4'));

  const final = form.page('Final');
  for (var i = 1; i < 4; i++) {
    const done = author_done[i];
    done.setChoices([
      done.createChoice('Add more author(s)', author[i+1]),
      done.createChoice('Finish adding authors and skip to final page', final)
    ])
  }
}
