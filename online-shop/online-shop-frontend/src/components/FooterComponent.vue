<template>
  <footer class="footer">
    <div class="footer-content">
      <p>&copy; 2024 在线商店. 保留所有权利。</p>
      <nav class="footer-nav">
        <a href="/about">关于我们</a>
        <a href="/terms">使用条款</a>
        <a href="/privacy">隐私政策</a>
        <a href="/contact">联系我们</a>
      </nav>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterComponent'
}
</script>

<style scoped>
.footer {
  background-color: #2c3e50;
  color: #ecf0f1;
  padding: 20px 0;
  position: relative;
  bottom: 0;
  width: 100%;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.footer p {
  margin: 0;
}

.footer-nav a {
  color: #ecf0f1;
  margin-left: 20px;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-nav a:hover {
  color: #3498db;
}
</style>

