require "test_helper"

class StaticPagesControllerTest < ActionDispatch::IntegrationTest
  test "should get gearlocker" do
    get static_pages_gearlocker_url
    assert_response :success
  end

  test "should get maps" do
    get static_pages_maps_url
    assert_response :success
  end

  test "should get tournaments" do
    get static_pages_tournaments_url
    assert_response :success
  end
end
