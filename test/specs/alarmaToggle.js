describe('App de Alarma - Activar y Desactivar', () => {
  it('Validar que se abra la app de Reloj', async () => {
    const alarmTab = await $('id=com.google.android.deskclock:id/navigation_bar_item_icon_container');
    await expect(alarmTab).toBeDisplayed();
  });

  it('Crear alarma para tener una disponible', async () => {
    const alarmTab = await $('id=com.google.android.deskclock:id/navigation_bar_item_icon_container');
    await alarmTab.click();

    const addButton = await $('~Add alarm');
    await addButton.click();

    const hour = await $('android=new UiSelector().text("8")');
    const minute = await $('android=new UiSelector().text("00")');
    await hour.click();
    await minute.click();

    const okBtn = await $('id=com.google.android.deskclock:id/material_timepicker_ok_button');
    await okBtn.click();
    
    const newAlarm = await $('android=new UiSelector().textContains("8:00")');
    await expect(newAlarm).toBeDisplayed();
  });

  it('Desactivar la alarma', async () => {
    const switchBtn = await $('id=com.google.android.deskclock:id/onoff');
    await switchBtn.click();
    await driver.pause(1000);
  });

  it('Activar la alarma', async () => {
    const switchBtn = await $('id=com.google.android.deskclock:id/onoff');
    await switchBtn.click();
    await driver.pause(1000);
  });
});
