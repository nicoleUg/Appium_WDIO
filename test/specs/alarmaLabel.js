describe('App de Alarma - Añadir Etiqueta', () => {
  it('Validar que se abra la app de Reloj', async () => {
    const alarmTab = await $('id=com.google.android.deskclock:id/navigation_bar_item_icon_container');
    await expect(alarmTab).toBeDisplayed();
  });

  it('Crear alarma para tener una disponible', async () => {
    const alarmTab = await $('id=com.google.android.deskclock:id/navigation_bar_item_icon_container');
    await alarmTab.click();

    const addButton = await $('~Add alarm');
    await addButton.click();

    const hour = await $('android=new UiSelector().text("9")');
    const minute = await $('android=new UiSelector().text("00")');
    await hour.click();
    await minute.click();

    const okBtn = await $('id=com.google.android.deskclock:id/material_timepicker_ok_button');
    await okBtn.click();
  });

  it('Añadir etiqueta a la alarma', async () => {
    // Expandir la alarma (clic en la tarjeta, no en la hora)
    const alarmCard = await $('//android.widget.TextView[contains(@text, "9:00")]/..');
    await alarmCard.click();
    await driver.pause(1000);

    // Clic en añadir etiqueta
    const addLabel = await $('//*[@text="Alarm name" or @text="Add label" or contains(@resource-id, "edit_label")]');
    await addLabel.click();

    // Escribir etiqueta en el modal
    const inputField = await $('android=new UiSelector().className("android.widget.EditText")');
    await inputField.setValue("Trabajo");

    // Click en Save
    const saveBtn = await $('android=new UiSelector().text("Save")');
    await saveBtn.click();

    // Verificar etiqueta
    const labelText = await $('android=new UiSelector().text("Trabajo")');
    await expect(labelText).toBeDisplayed();
  });
});
