document
  .getElementById("editSubCategoryBtn")
  .addEventListener("click", async (e) => {
    e.preventDefault();
    const subCategoryName = document
      .getElementById("subCategoryName")
      .value.trim();

    const offerPercentage = document
      .getElementById("offerPercentage")
      .value.trim();
    const logErrorMessage = document.getElementById("logErrorMessage");

    // Check required field
    if (!subCategoryName) {
      logErrorMessage.textContent = "SubCategory Name are Required";
      return false;
    }
    if (offerPercentage < 0) {
      logErrorMessage.textContent = "Offer Percentage cannot be negative";
      return false;
    }
    if (offerPercentage > 100) {
      logErrorMessage.textContent =
        "Offer Percentage cannot be greater than 100";
      return false;
    }

    const categoryId = document.getElementById("categoryId").value;
    const subCategoryId = document.getElementById("subCategoryId").value;
    const url = `/admin/editSubCategory/${categoryId}/${subCategoryId}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subCategoryName,
        status: document.getElementById("inputStatus").value,
        offerStatus: document.getElementById("inputOfferStatus").value,
        offerPercentage,
        startDate: document.getElementById("startDate").value,
        expiryDate: document.getElementById("expiryDate").value,
      }),
    });

    const data = await response.json();
    if (!data.success) {
      logErrorMessage.textContent = data.message;
      return false;
    } else {
      window.location.href = data.redirectUrl;
    }
  });
