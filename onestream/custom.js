if (inSidedData.user.role.includes('roles.guest')) {
  const hideClasses = ['title-ideastream', 'title-partners', 'title-internal'];

  // Hide Menu Items
  document.querySelectorAll('li.header-navigation_list-item a').forEach(link => {
    if (hideClasses.some(cls => link.classList.contains(cls))) {
      link.closest('li').style.display = 'none';
    }
  });
  
  // Hide the article.quicklink-icon containing an <a> with href="https://procore-en-community.insided.com/ideas"
  document.querySelector('article.quicklink-icon a[href="https://gordonhockey-en-community.insided.com/ideas"]')?.closest('article.quicklink-icon')?.style.setProperty("display", "none");
}
