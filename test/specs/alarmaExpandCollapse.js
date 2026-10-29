describe('App de Alarma - Expandir y Contraer', () => {
  it('Validar que se abra la app de Reloj', async () => {
    const alarmTab = await $('id=com.google.android.deskclock:id/navigation_bar_item_icon_container');
    await expect(alarmTab).toBeDisplayed();
  });

  it('Crear alarma para tener una disponible', async () => {
    const alarmTab = await $('id=com.google.android.deskclock:id/navigation_bar_item_icon_container');
    await alarmTab.click();

    const addButton = await $('~Add alarm');
    await addButton.click();

    const hour = await $('android=new UiSelector().text("5")');
    const minute = await $('android=new UiSelector().text("00")');
    await hour.click();
    await minute.click();

    const okBtn = await $('id=com.google.android.deskclock:id/material_timepicker_ok_button');
    await okBtn.click();
  });

  it('Expandir detalles de la alarma', async () => {
    const alarmCard = await $('//android.widget.TextView[contains(@text, "5:00")]/..');
    await alarmCard.click();
    await driver.pause(1000);

    // Validar que se muestre el botón de eliminar
    const deleteBtn = await $('android=new UiSelector().text("Delete")');
    await expect(deleteBtn).toBeDisplayed();
  });

  it('Contraer detalles de la alarma', async () => {
    // Para cerrar el bottom sheet (contraer), volvemos atrás
    await driver.back();
    await driver.pause(1000);
    
    // Validar que ya no se muestre el botón de eliminar
    const deleteBtnHidden = await $('android=new UiSelector().text("Delete")');
    await expect(deleteBtnHidden).not.toBeDisplayed();
  });
});
