/* Hide Menu Items */
<script>
  if (inSidedData.user.role.includes('roles.guest')) {
    const hideClasses = ['title-ideastream', 'title-partners', 'title-Internal'];

    document.querySelectorAll('li.header-navigation_list-item a').forEach(link => {
      if (hideClasses.some(cls => link.classList.contains(cls))) {
        link.closest('li').style.display = 'none';
      }
    });
  }
</script>
