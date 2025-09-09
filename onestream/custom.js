/* Hide Menu Items */
<script>
  if (inSidedData.user.role.includes('roles.guest')) {
    document.querySelectorAll('li.header-navigation_list-item a').forEach(link => {
      if (
        link.classList.contains('title-ideastream') ||
        link.classList.contains('title-partners') ||
        link.classList.contains('title-internal')
      ) {
        link.closest('li').style.display = 'none';
      }
    });
  }
</script>
