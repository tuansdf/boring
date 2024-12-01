export const ScreenLoading = () => {
  return (
    <div class="position-fixed top-0 start-0 bottom-0 end-0 d-flex justify-content-center align-items-center bg-black opacity-50">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};
