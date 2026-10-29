describe('App de Alarma - Días de Repetición', () => {
  it('Validar que se abra la app de Reloj', async () => {
    const alarmTab = await $('id=com.google.android.deskclock:id/navigation_bar_item_icon_container');
    await expect(alarmTab).toBeDisplayed();
  });

  it('Crear alarma para tener una disponible', async () => {
    const alarmTab = await $('id=com.google.android.deskclock:id/navigation_bar_item_icon_container');
    await alarmTab.click();

    const addButton = await $('~Add alarm');
    await addButton.click();

    const hour = await $('android=new UiSelector().text("7")');
    const minute = await $('android=new UiSelector().text("30")');
    await hour.click();
    await minute.click();

    const okBtn = await $('id=com.google.android.deskclock:id/material_timepicker_ok_button');
    await okBtn.click();
  });

  it('Activar la opción de repetir la alarma', async () => {
    // Expandir la alarma (clic en la tarjeta, no en la hora)
    const alarmCard = await $('//android.widget.TextView[contains(@text, "7:30")]/..');
    await alarmCard.click();
    await driver.pause(1000);

    // Seleccionar día (ej. Lunes / Monday)
    let dayBtn = await $('android=new UiSelector().text("M")');
    if (!(await dayBtn.isExisting())) {
        dayBtn = await $('android=new UiSelector().text("L")');
    }
    if (await dayBtn.isExisting()) {
        await dayBtn.click();
    }

    // Guardar los cambios
    const saveBtn = await $('android=new UiSelector().text("Save")');
    await saveBtn.click();
    
    await driver.pause(1000);
  });
});
