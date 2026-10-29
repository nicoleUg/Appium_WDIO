describe('App de Alarma - Activar Vibración', () => {
  it('Validar que se abra la app de Reloj', async () => {
    const alarmTab = await $('id=com.google.android.deskclock:id/navigation_bar_item_icon_container');
    await expect(alarmTab).toBeDisplayed();
  });

  it('Crear alarma para tener una disponible', async () => {
    const alarmTab = await $('id=com.google.android.deskclock:id/navigation_bar_item_icon_container');
    await alarmTab.click();

    const addButton = await $('~Add alarm');
    await addButton.click();

    const hour = await $('android=new UiSelector().text("6")');
    const minute = await $('android=new UiSelector().text("00")');
    await hour.click();
    await minute.click();

    const okBtn = await $('id=com.google.android.deskclock:id/material_timepicker_ok_button');
    await okBtn.click();
  });

  it('Desactivar vibración', async () => {
    const alarmCard = await $('//android.widget.TextView[contains(@text, "6:00")]/..');
    await alarmCard.click();
    await driver.pause(1000);

    const vibrateText = await $('android=new UiSelector().text("Vibrate")');
    await vibrateText.click();

    // Guardar
    const saveBtn = await $('android=new UiSelector().text("Save")');
    await saveBtn.click();
    
    await driver.pause(1000);
  });
});
