
document.addEventListener("DOMContentLoaded", function () {
  // Hide Events for employees
  if (inSidedData.user.role.includes('Employee')) { 
    document.querySelectorAll('li.header-navigation_list-item a').forEach(link => {
      if (link.classList.contains('title-events')) {
        link.closest('li').style.display = 'none';
      }
    });
  }
});
