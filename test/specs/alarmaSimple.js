describe('App de Alarma en Android', () => {
  
  it('Validar que se abra la app de Reloj', async () => {
    // Título de la barra superior (Alarm, Clock, etc.)
    const alarmTab = await $('id=com.google.android.deskclock:id/navigation_bar_item_icon_container'); 
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

});
