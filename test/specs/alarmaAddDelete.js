describe('App de Alarma en Android', () => {
  
  it('Validar que se abra la app de Reloj', async () => {
    // Título de la barra superior (Alarm, Clock, etc.)
    const alarmTab = await $('id=com.google.android.deskclock:id/navigation_bar_item_icon_container');   // usando content-desc (accessibilityId)
    await expect(alarmTab).toBeDisplayed();
  });

  it('Crear una nueva alarma', async () => {
    // Ir a la pestaña de Alarmas
    const alarmTab = await $('id=com.google.android.deskclock:id/navigation_bar_item_icon_container');
    await alarmTab.click();

  
    const addButton = await $('~Add alarm');
    await addButton.click();

    
    const hour = await $('android=new UiSelector().text("11")');
    const minute = await $('android=new UiSelector().text("30")');
    await hour.click();
    await minute.click();

    // Confirmar
    const okBtn = await $('id=com.google.android.deskclock:id/material_timepicker_ok_button');
    await okBtn.click();

    // Validar que la nueva alarma aparece en la lista
    const newAlarm = await $('android=new UiSelector().textContains("11:30")');
    await expect(newAlarm).toBeDisplayed();
  });

  it('Eliminar una alarma existente (11:30)', async () => {
    // Buscar la alarma creada
    const alarm = await $('android=new UiSelector().textContains("11:30")');
    await expect(alarm).toBeDisplayed();
    await alarm.click();
    await driver.pause(2000);
    
    console.log("PAGE_SOURCE_START");
    console.log(await driver.getPageSource());
    console.log("PAGE_SOURCE_END");

    const deleteBtn = await $('android=new UiSelector().resourceId("com.google.android.deskclock:id/delete")');
    // await expect(deleteBtn).toBeDisplayed();
    await deleteBtn.click();

    // Validar que ya no está
    const alarms = await $$('android=new UiSelector().textContains("11:30")');
    await expect(alarms).toBeElementsArrayOfSize(0);
});

});

